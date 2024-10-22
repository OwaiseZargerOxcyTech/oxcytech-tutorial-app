import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./_components/LoginForm"), {
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
