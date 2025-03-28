import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import useApi from "./api/useApi";
import useLetters from "./api/useLetters";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import Button from "./Button";
import TextField from "./TextField";

function LetterEditor() {
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);
    const [savingToDrive, setSavingToDrive] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const api = useApi();
    const { createLetter, updateLetter, saveToDrive } = useLetters();

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            StarterKit,
            Bold,
            Italic,
            Underline,
            Strike,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            BulletList,
            OrderedList,
            ListItem,
        ],
        content: "",
    });

    useEffect(() => {
        if (isEditing && editor) {
            const fetchLetter = async () => {
                setLoading(true);
                try {
                    const letter = await api.get(`/api/letters/${id}`);
                    setTitle(letter.title);

                    // Set editor content
                    editor.commands.setContent(letter.content);
                } catch (error) {
                    console.error("Error fetching letter:", error);
                    setError("Failed to load the letter. Please try again later.");
                } finally {
                    setLoading(false);
                }
            };

            fetchLetter();
        }
    }, [id, isEditing, editor]);

    const getContent = useCallback(() => {
        return editor ? editor.getHTML() : "";
    }, [editor]);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Please enter a title for your letter");
            return;
        }

        const content = getContent();
        if (!content.trim() || content === "<p></p>") {
            alert("Please enter some content for your letter");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            if (isEditing) {
                await updateLetter(id, { title, content });
            } else {
                const newLetter = await createLetter({ title, content });
                navigate(`/editor/${newLetter._id}`);
            }

            alert("Letter saved successfully!");
        } catch (error) {
            console.error("Error saving letter:", error);
            setError("Failed to save the letter. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveToDrive = async () => {
        if (!isEditing) {
            alert("Please save the letter first before saving to Google Drive");
            return;
        }

        setSavingToDrive(true);
        setError(null);

        try {
            await saveToDrive(id);
            alert("Letter saved to Google Drive successfully!");
        } catch (error) {
            console.error("Error saving to Google Drive:", error);
            setError("Failed to save to Google Drive. Please try again.");
        } finally {
            setSavingToDrive(false);
        }
    };

    const MenuBar = () => {
        if (!editor) {
            return null;
        }

        return (
            <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("bold")
                            ? "bg-gray-200 font-bold"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("italic")
                            ? "bg-gray-200 italic"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("underline")
                            ? "bg-gray-200 underline"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    Underline
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("strike")
                            ? "bg-gray-200 line-through"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("heading", { level: 1 })
                            ? "bg-gray-200 font-bold"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("heading", { level: 2 })
                            ? "bg-gray-200 font-bold"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("heading", { level: 3 })
                            ? "bg-gray-200 font-bold"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("bulletList")
                            ? "bg-gray-200"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    Bullet List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded text-sm ${
                        editor.isActive("orderedList")
                            ? "bg-gray-200"
                            : "bg-white border border-gray-300"
                    }`}
                    type="button"
                >
                    Ordered List
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="h-64 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEditing ? "Edit Letter" : "Create New Letter"}
                </h1>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => navigate("/dashboard")}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save Draft"}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveToDrive}
                        disabled={savingToDrive || !isEditing}
                    >
                        {savingToDrive ? "Saving to Drive..." : "Save to Google Drive"}
                    </Button>
                </div>
            </div>

            <ErrorAlert message={error} />

            <div className="space-y-6">
                <TextField
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter letter title"
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <MenuBar />
                        <EditorContent
                            editor={editor}
                            className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LetterEditor;
