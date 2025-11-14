"use server";

import { ID, Query, Permission, Role} from "node-appwrite";
import { parseStringify } from "../utils";
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config";
import { InputFile } from "node-appwrite/file";


export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      name: user.name,
    });

    return parseStringify(newUser);
  } catch (error: unknown) {
     if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 409
    ) {
      const documents = await users.list({
        queries: [Query.equal("email", [user.email])],
      });
      return documents.users[0];
    }

    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId });
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const blobFile = identificationDocument.get('blobFile') as Blob;
      const fileName = identificationDocument.get('fileName') as string;

      const arrayBuffer = await blobFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const inputFile = InputFile.fromBuffer(buffer, fileName);

      file = await storage.createFile({
        bucketId: BUCKET_ID!,
        fileId: ID.unique(),
        file: inputFile,
        permissions: [
          Permission.read(Role.any()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ],
      });
    }

    const newPatient = await databases.createDocument({
      databaseId: DATABASE_ID!,
      collectionId: PATIENT_COLLECTION_ID!,
      documentId: ID.unique(),
      data: {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file
          ? `${ENDPOINT}/v1/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      },
      permissions: [
        'read("users")',
        'update("users")',
        'delete("users")',
      ],
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error('Error registering patient:', error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    if (!userId) throw new Error("userId is missing");

    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
};
