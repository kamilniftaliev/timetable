"use client";

import { Button } from "flowbite-react";
import { MdOutlineIosShare } from "react-icons/md";
import { FaLink, FaCheck } from "react-icons/fa6";
import { useCallback, useEffect, useState } from "react";
import { getTitle, reportAnalyticEvent } from "@/utils";
import { ICON_SIZE_CLASSES } from "@/constants";

interface Props {
  teacherName: string;
  className: string;
  selectedClassId: string;
  selectedTeacherId: string;
}

export function ShareButton({
  teacherName,
  className,
  selectedClassId,
  selectedTeacherId,
}: Props) {
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!linkCopied) return;

    const timeout = setTimeout(() => setLinkCopied(false), 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [linkCopied]);

  const share = useCallback(async () => {
    try {
      const url = window.location.href;

      if (navigator.share) {
        const text = getTitle({ teacher: teacherName, className });

        await navigator.share({
          title: text,
          url,
          text,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
      }

      reportAnalyticEvent({
        action: "share",
        category: "engagement",
        label: "share",
        value: url,
      });
    } catch (error) {
      console.log("Error sharing", error);
    }
  }, [teacherName, className, selectedTeacherId, selectedClassId]);

  return (
    <>
      <Button
        className="cursor-pointer gap-2 bg-neutral-900 text-xl font-bold text-white hover:bg-blue-900 md:text-base dark:bg-white dark:text-gray-900 dark:hover:bg-blue-900 dark:hover:text-white print:hidden"
        onClick={share}
      >
        {linkCopied ? (
          <>
            <FaCheck className={ICON_SIZE_CLASSES} />
            Link Kopyalandı
          </>
        ) : (
          <>
            {navigator.share ? (
              <MdOutlineIosShare className={ICON_SIZE_CLASSES} />
            ) : (
              <FaLink className={ICON_SIZE_CLASSES} />
            )}
            Paylaş
          </>
        )}
      </Button>
      {linkCopied && (
        <p className="text-center text-xl font-semibold">
          Bu linkə keçid edən hər kəs eyni cədvəli görəcək.
        </p>
      )}
    </>
  );
}
