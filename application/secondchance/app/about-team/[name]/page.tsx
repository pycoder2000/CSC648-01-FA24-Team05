import { notFound } from 'next/navigation';
import members from '../member';

export default function MemberDetail({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const member = members.find((member) => member.name === name);

  if (!member) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <img
          src={`/team/${member.image}`}
          alt={member.name}
          className="mx-auto h-48 w-48 rounded-full object-cover shadow-lg"
        />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">{member.name}</h1>
        <p className="text-gray-600">{member.position}</p>
      </div>
      <div className="mt-6 text-gray-700">
        <p>{member.bio}</p>
      </div>
      <div className="mt-6 text-center">
        <a
          href="/about-team"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Team
        </a>
      </div>
    </div>
  );
}
