import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function RichTextEditor({ value, onChange, error }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Tulis isi berita di sini...',
            }),
            HorizontalRule,
            Blockquote,
        ],

        content: value,

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const addLink = () => {
        const url = prompt('Masukkan URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const wordCount = editor.storage.characterCount?.words() ?? editor.getText().split(/\s+/).filter(Boolean).length;

    return (
        <div className={`rounded-xl border bg-white ${error ? 'border-red-500' : ''}`}>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 border-b bg-gray-50 p-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                >
                    <Bold size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                >
                    <Italic size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                >
                    <UnderlineIcon size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
                >
                    <Heading1 size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                >
                    <Heading2 size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
                >
                    <Heading3 size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                >
                    <List size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                >
                    <ListOrdered size={16} />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
                >
                    <Quote size={16} />
                </button>

                <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="rounded p-2 hover:bg-gray-200">
                    <Minus size={16} />
                </button>

                <button type="button" onClick={addLink} className={`rounded p-2 hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}>
                    <LinkIcon size={16} />
                </button>

                <button type="button" onClick={() => editor.chain().focus().undo().run()} className="rounded p-2 hover:bg-gray-200">
                    <Undo size={16} />
                </button>

                <button type="button" onClick={() => editor.chain().focus().redo().run()} className="rounded p-2 hover:bg-gray-200">
                    <Redo size={16} />
                </button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="prose min-h-[250px] max-w-none p-4 focus:outline-none" />

            {/* Word Counter */}
            <div className="border-t px-3 py-2 text-right text-xs text-gray-500">{wordCount} kata</div>
        </div>
    );
}
