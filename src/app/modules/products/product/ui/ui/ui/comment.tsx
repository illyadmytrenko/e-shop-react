import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/common/shared/redux";
import { userInfoSlice } from "@/app/modules/users/user-info.slice";
import { Comment } from "@/app/modules/products/api";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";

interface CommentCompProps {
  comment: Comment;
}

export function CommentComp({ comment }: CommentCompProps) {
  const [userName, setUserName] = useState<string>("");

  const userId = useAppSelector(userInfoSlice.selectors.selectUserInfoId);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/${comment.userId}`
        );
        if (response.ok) {
          const user = await response.json();
          setUserName(user.userName);
        } else {
          setUserName("User");
        }
      } catch (error) {
        console.error("Error while getting userName:", error);
        setUserName("Error");
      }
    };

    fetchUserName();
  }, [comment.userId]);

  const handleLikeOrDislike = useCallback(
    async (commentId: number, action: string): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:5000/update-comment/${commentId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              like: action === "like",
              dislike: action === "dislike",
            }),
          }
        );

        if (!response.ok) {
          return;
        }

        window.location.reload();
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    },
    [userId]
  );

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex flex-col">
      <div className="flex items-center justify-between gap-10">
        <div>
          <h5 className="text-xl font-bold mb-1">{userName}</h5>
          <span className="text-sm text-gray-500">
            {comment.commentDate.split(" ")[0]}
          </span>
        </div>
        <div className="bg-blue-900 p-2 rounded-md flex items-center gap-1">
          <CustomImage
            src="/products/product/white-star.svg"
            alt="white star icon"
            width={16}
            height={16}
          />
          <span className="text-sm text-white">
            {comment.commentRating ? `${comment.commentRating}.0` : "N/A"}
          </span>
        </div>
      </div>
      <article className="mb-3">{comment.comment}</article>
      <div className="self-end flex gap-8">
        <CustomButton
          className="flex gap-3 relative after:absolute after:h-full after:w-[2px] after:bg-gray-500 after:bottom-0 after:-right-4"
          onClick={() => handleLikeOrDislike(comment.commentId, "like")}
        >
          <CustomImage
            src="/products/comment/like.svg"
            alt="like icon"
            width={24}
            height={24}
          />
          <span className="text-sm text-gray-500">{comment.commentLikes}</span>
        </CustomButton>
        <CustomButton
          className="flex gap-3"
          onClick={() => handleLikeOrDislike(comment.commentId, "dislike")}
        >
          <CustomImage
            src="/products/comment/dislike.svg"
            alt="dislike icon"
            width={24}
            height={24}
          />
          <span className="text-sm text-gray-500">
            {comment.commentDislikes}
          </span>
        </CustomButton>
      </div>
    </div>
  );
}
