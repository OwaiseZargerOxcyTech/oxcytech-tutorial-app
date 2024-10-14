import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/login/LoginForm"), {
  ssr: false,
});

const Page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Page;
