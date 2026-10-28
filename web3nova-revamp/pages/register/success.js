import Success from "@/components/Register/Success"; // 1 import

import Seo from '@/components/Seo';

export default function SuccessPage() {
  return (
    <>
      <Seo title="Application Received" noindex />
      <Success />
    </>
  );
}