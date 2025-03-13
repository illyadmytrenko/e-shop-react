import { Comment } from "../../../api";
import { useCallback, useState } from "react";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import clsx from "clsx";
import { useValidation } from "@/common/functions/useValidate";
import { CommentComp } from "./ui/comment";

interface CommentsProps {
  productId: number;
  userId: number;
  showAlert: (text: string) => void;
  comments: Comment[];
}

export function Comments({
  productId,
  userId,
  showAlert,
  comments,
}: CommentsProps) {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { errors, validateSingleField } = useValidation({
    inputNames: ["userMessage"],
    initialErrors: [""],
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
      validateSingleField("userMessage", e.target.value);
    },
    [validateSingleField]
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!validateSingleField("userMessage", comment)) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          comment,
          commentRating: rating,
        }),
      });

      if (response.ok) {
        showAlert("Comment successfully left!");
        setComment("");
        setRating(0);

        await fetch(`http://localhost:5000/update-products/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentRating: rating,
          }),
        });

        window.location.reload();
      } else {
        console.error("Error saving comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  }, [comment, rating, productId, userId, showAlert, validateSingleField]);

  const handleRatingChange = useCallback((value: number): void => {
    setRating(value);
  }, []);

  return (
    <div>
      <h5 className="mb-4 text-xl font-medium">Comments</h5>
      <span className="text-lg mb-6 block text-left">
        Leave your comments here for other customers
      </span>
      <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8">
        <div className="flex-[1_1_30%]">
          <div className="mb-5">
            <textarea
              name="userMessage"
              id="userMessage"
              placeholder="Share your thoughts about this product here"
              value={comment}
              onChange={handleChange}
              className={clsx(
                "border-2 border-solid border-gray-400 rounded-md p-2 h-[180px] resize-none w-full hover:border-blue-500",
                errors[0] && "border-red-500"
              )}
              maxLength={500}
            />
            {errors[0] && (
              <p className="text-red-500 text-sm font-bold pl-2 mt-1 mb-2">
                {errors[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-lg font-medium text-gray-500">
              Rate this product (0 - 5)
            </label>
            <div className="flex space-x-2 mt-2">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <CustomButton
                  key={value}
                  onClick={() => handleRatingChange(value)}
                  className={clsx(
                    "w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-500",
                    rating >= value
                      ? "bg-yellow-400"
                      : "bg-white hover:bg-yellow-100"
                  )}
                >
                  {value}
                </CustomButton>
              ))}
            </div>
          </div>
          <CustomButton variant="outlined" size="md" onClick={handleSubmit}>
            Comment
          </CustomButton>
        </div>
        {comments.length >= 1 && (
          <div className="flex flex-col gap-4 flex-[1_1_70%]">
            {comments.map((comment) => {
              return <CommentComp key={comment.commentId} comment={comment} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
