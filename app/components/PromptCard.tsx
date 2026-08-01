"use client";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsCopy, BsThreeDotsVertical, BsCheckCircleFill } from "react-icons/bs";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { openViewPromptModal } from "@/redux/features/modal/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PromptUI } from "@/types/prompt-ui";
import { usePromptActions } from "@/hooks/usePromptActions";

type Props = {
    prompt: PromptUI;
};

const PromptCard = ({ prompt }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    /* ================= Open View Modal ================= */
    const handleOpenPrompt = () => {
        dispatch(openViewPromptModal(prompt.id));
    };

    const {
        copied,
        copyPrompt,
        toggleFavourite,
        togglePinned,
        formatTimeAgo,
    } = usePromptActions();

    const handleToggleFavourite = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        toggleFavourite(prompt.id);
    };

    const handleTogglePinned = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        togglePinned(prompt.id);
    };

    const handleCopy = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        copyPrompt(prompt.prompt);
    };

    return (
        <article
            onClick={handleOpenPrompt}
            className={`flex h-44 cursor-pointer flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 ${prompt.pinned && 'ring-1 ring-blue-600'}`}
        >
            {/* ================= Header ================= */}
            <div className="flex items-start justify-between">
                {/* Prompt Title */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <h4 className="truncate font-semibold text-zinc-900 transition-colors duration-300 dark:text-white">
                        {prompt.title}
                    </h4>
                </div>

                {/* More Options */}
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 transition-colors duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                    <BsThreeDotsVertical />
                </button>
            </div>

            {/* ================= Prompt Description ================= */}
            <p className="line-clamp-2 text-sm text-zinc-600 transition-colors duration-300 dark:text-zinc-400">
                {prompt.description?.trim()
                    ? prompt.description
                    : prompt.prompt}
            </p>

            {/* ================= Category ================= */}
            <div className="flex items-center justify-between">
                <div className="w-fit rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 transition-colors duration-300 dark:bg-blue-950/50 dark:text-blue-400">
                    {prompt.category}
                </div>

                {/* Tags */}
                {prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {prompt.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium text-blue-700 dark:text-blue-400"
                            >
                                #{tag}
                            </span>
                        ))}

                        {prompt.tags.length > 2 && (
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                ...
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* ================= Footer ================= */}
            <div className="flex items-center justify-between">
                {/* Created Time */}
                <p className="text-xs text-zinc-400 transition-colors duration-300 dark:text-zinc-500">
                    {formatTimeAgo(prompt.createdAt)}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Pinned Button */}
                    <button
                        onClick={handleTogglePinned}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-xl transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${prompt.pinned
                            ? "text-blue-500"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            }`}
                    >
                        {prompt.pinned ? <TiPin /> : <TiPinOutline />}
                    </button>

                    {/* Favourite Button */}
                    <button
                        onClick={handleToggleFavourite}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-xl transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${prompt.favourite
                            ? "text-red-500"
                            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            }`}
                    >
                        {prompt.favourite ? <AiFillLike /> : <AiOutlineLike />}
                    </button>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-xl transition-colors duration-300 cursor-pointer ${copied
                            ? "text-black dark:text-white"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                            }`}
                    >
                        {copied ? <BsCheckCircleFill /> : <BsCopy />}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default PromptCard;