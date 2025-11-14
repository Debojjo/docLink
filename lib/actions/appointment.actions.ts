'use server';

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async ( appointment: CreateAppointmentParams)=> {
    try {
        const newAppointment = await databases.createDocument({
              databaseId: DATABASE_ID!,
              collectionId: APPOINTMENT_COLLECTION_ID!,
              documentId: ID.unique(),
              data: {
                ...appointment,
              },
            });
            return parseStringify(newAppointment);
    } catch (error) {
        console.log(error);
    }
}


export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument({
            databaseId: DATABASE_ID!,
            collectionId: APPOINTMENT_COLLECTION_ID!,
            documentId: appointmentId,
        })
        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
    }
}