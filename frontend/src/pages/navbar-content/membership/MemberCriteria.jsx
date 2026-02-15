function MemberCriteria() {
  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Membership Criteria</h2>
        <p className="mb-6">
          To become a member of BITPFC, applicants must meet the following
          criteria:
        </p>

        <ol className="list-decimal list-inside space-y-6">
          <li>
            <strong>RULES AND GUIDELINES OF MEMBERSHIP</strong>
            <ol className="list-disc list-inside ml-6 mt-3 space-y-2">
              <li>
                BITPCL’s specialized team will thoroughly review each
                application, maintaining the authority to decline any membership
                request that does not align with our standards.
              </li>
              <li>
                Applicant engaged only in Software; ITES is eligible to be a
                Member of BITPCL.
              </li>
              <li>
                BITPCL authority has the right to accept or reject the
                membership application without any clarification.
              </li>
            </ol>
          </li>

          <li>
            <strong>MEMBERSHIP CATEGORIES</strong>
            <ol className="list-disc list-inside ml-6 mt-3 space-y-3">
              <li>
                <strong>IN CASE OF Life Member</strong>
                <p className="mt-1">
                  Applicants must possess a minimum of 15 years of IT-related
                  work experience after obtaining their Bachelor’s degree.
                </p>
              </li>
              <li>
                <strong>IN CASE OF Professional Member</strong>
                <p className="mt-1">
                  Applicants must possess a minimum of 5 years of IT-related
                  work experience after obtaining their Bachelor’s degree.
                </p>
              </li>
              <li>
                <strong>IN CASE OF General Member</strong>
                <p className="mt-1">
                  Applicants must possess a minimum of 1 year of IT-related work
                  experience after obtaining their Bachelor’s degree.
                </p>
              </li>
              <li>
                <strong>IN CASE OF Student Member</strong>
                <p className="mt-1">
                  Student Members are individuals enrolled in a university
                  program and pursuing an IT degree who have demonstrated
                  interest in the IT profession, and who are not employed
                  full-time in the profession, may become student members.
                </p>
              </li>
            </ol>
          </li>

          <li>
            <strong>MEMBERSHIP CERTIFICATE</strong>
            <p className="mt-2">
              Every member of the club will obtain its membership certificate
              after completing their registration form and clearing the annual
              fee.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default MemberCriteria;
