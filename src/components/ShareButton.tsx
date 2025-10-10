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
  const [ready, setReady] = useState(false);
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

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Button
        className="gap-2 text-xl font-bold text-white cursor-pointer bg-neutral-900 hover:bg-blue-900 md:text-base dark:bg-white dark:text-gray-900 dark:hover:bg-blue-900 dark:hover:text-white print:hidden"
        onClick={share}
      >
        {linkCopied ? (
          <>
            <FaCheck className={ICON_SIZE_CLASSES} />
            Link Kopyalandı
          </>
        ) : (
          <>
            {ready && (
              <>
                {navigator.share ? (
                  <MdOutlineIosShare className={ICON_SIZE_CLASSES} />
                ) : (
                  <FaLink className={ICON_SIZE_CLASSES} />
                )}
              </>
            )}
            Paylaş
          </>
        )}
      </Button>
      {linkCopied && (
        <p className="text-xl font-semibold text-center">
          Bu linkə keçid edən hər kəs eyni cədvəli görəcək.
        </p>
      )}
    </>
  );
}
