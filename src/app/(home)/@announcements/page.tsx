"use client";
import { useDb, useInfo } from "@/services";
import { useLoadingAsync } from "@/utils/hooks/useLoadingAsync";
import styles from "../index.module.scss";
import { Button } from "@/client-components";

const Announcements = () => {
  const { announcements, refreshAnnouncements } = useInfo();
  const { admins, refreshAdmins } = useDb();

  const { loading } = useLoadingAsync(async () => {
    await refreshAnnouncements();
    await refreshAdmins();
  }, [refreshAnnouncements]);

  return (
    <div className={`${styles.card} ${styles.overflow}`}>
      {!loading && (
        <>
          {/* {announcements.map((announ, index) => ( */}
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02yvywRWdUctm65ULixEWxdDQ7VjdCJJ4WXgujSmvv1Mgj8iHmdvJTGiAHKR8PJyEdl%26id%3D100063818894873&show_text=true&width=500"
            width="100%"
            height="85%"
            style={{
              border: "none",
              borderRadius: "0.5rem",
            }}
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <a
            href="https://www.facebook.com/profile.php?id=100063818894873"
            target="_blank"
          >
            <Button>Go to Facebook page</Button>
          </a>

          {/* ))} */}
        </>
      )}
    </div>
  );
};

export default Announcements;
