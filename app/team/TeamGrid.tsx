'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TeamMember } from '../types';
import { getImageUrl } from '../lib/utils';

interface TeamGridProps {
  teamMembers: TeamMember[];
}

export default function TeamGrid({ teamMembers }: TeamGridProps) {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">Информация о команде скоро появится</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {teamMembers.map((member) => (
        <div key={member.id} className="card">
          <div className="flex flex-col h-full">
            {/* Photo and Name */}
            <div className="flex gap-4 mb-4">
              <div className="relative w-[100px] h-[100px] rounded-[10px] overflow-hidden flex-shrink-0">
                <Image
                  src={getImageUrl(member.image)}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-meatra-text-gray text-sm mb-2">{member.name}</p>
                <h3 className="text-white text-xl font-bold uppercase leading-tight">
                  {member.position}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1">
              <p className={`text-gray-300 text-sm leading-relaxed ${
                expandedMember === member.id ? '' : 'line-clamp-3'
              }`}>
                {member.description || member.shortDescription}
              </p>
            </div>

            {/* Toggle Button */}
            {member.description && member.description.length > 100 && (
              <button
                onClick={() => setExpandedMember(
                  expandedMember === member.id ? null : member.id
                )}
                className="mt-3 text-meatra-gold text-sm hover:text-[#E8B83A] transition-colors text-left"
              >
                {expandedMember === member.id ? 'Скрыть' : 'Читать далее'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
