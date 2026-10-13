import { deleteSkill } from "@/app/skills/actions";
import type { SkillGroup } from "@/lib/skills";

const levelColor: Record<string, string> = {
  상: "bg-black text-white dark:bg-white dark:text-black",
  중: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200",
  하: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

export function SkillGroupList({
  groups,
  allowDelete = false,
}: {
  groups: SkillGroup[];
  allowDelete?: boolean;
}) {
  if (groups.length === 0) {
    return <p className="text-sm text-zinc-500">등록된 기술이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((section) => (
        <section key={section.category} className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
            {section.category}
          </h2>
          <ul className="flex flex-col gap-2">
            {section.items.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center justify-between rounded-lg border border-black/[.08] px-5 py-3 dark:border-white/[.145]"
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {skill.name}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${levelColor[skill.level]}`}
                  >
                    {skill.level}
                  </span>
                  {allowDelete && (
                    <form action={deleteSkill}>
                      <input type="hidden" name="id" value={skill.id} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-red-600 hover:underline dark:text-red-400"
                        aria-label={`${skill.name} 삭제`}
                      >
                        삭제
                      </button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
