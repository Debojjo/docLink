import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-1 h-30 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 DocLink
            </p>
            <Link href="/?admin=true" className="text-green-300">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/homepage.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden md:block h-screen w-1/2 object-cover sticky top-0"
      />
    </div>
  );
}
