import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);
  //   const patient = await getPatient(userId);

  //   if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/images/logo.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-1 h-50 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2025 DocLink</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.jpg"
        height={1500}
        width={1500}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Register
