import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

export default async function Appointment ({ params }: SearchParamProps)  {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/images/logo.png"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-1 h-50 w-fit"
          />

          <AppointmentForm 
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-10 py-12">© 2025 DocLink</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.jpg"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};
