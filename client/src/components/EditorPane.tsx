import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPane = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] =
    useState<EditorPanelProps["selectedElement"]>(null);

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!values) return null;

  const handleChange = (field: "text" | "className", value: string) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (style: string, value: string) => {
    const updatedStyles = { ...values.styles, [style]: value };
    setValues({ ...values, styles: updatedStyles });
    onUpdate({ styles: { [style]: value } });
  };

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-right-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Edit Element</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Text Content */}
      <div className="space-y-2 mb-4">
        <label className="block text-xs font-medium text-gray-500">
          Text Content
        </label>
        <textarea
          value={values.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full text-sm text-black p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
        />
      </div>

      {/* Class Name */}
      <div className="space-y-2 mb-4">
        <label className="block text-xs font-medium text-gray-500">
          Class Name
        </label>
        <input
          type="text"
          value={values.className}
          onChange={(e) => handleChange("className", e.target.value)}
          className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-black"
        />
      </div>

      {/* Spacing */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Padding
          </label>
          <input
            type="text"
            value={values.styles.padding}
            onChange={(e) =>
              handleStyleChange("padding", e.target.value)
            }
            className="w-full text-sm p-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Margin
          </label>
          <input
            type="text"
            value={values.styles.margin}
            onChange={(e) =>
              handleStyleChange("margin", e.target.value)
            }
            className="w-full text-sm p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
      </div>

      {/* Typography */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Font Size
        </label>
        <input
          type="text"
          value={values.styles.fontSize}
          onChange={(e) =>
            handleStyleChange("fontSize", e.target.value)
          }
          className="w-full text-sm p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Background
          </label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
            <input
              type="color"
              value={values.styles.backgroundColor || "#ffffff"}
              onChange={(e) =>
                handleStyleChange(
                  "backgroundColor",
                  e.target.value
                )
              }
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-xs text-gray-600 truncate">
              {values.styles.backgroundColor}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Text Color
          </label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
            <input
              type="color"
              value={values.styles.color || "#000000"}
              onChange={(e) =>
                handleStyleChange("color", e.target.value)
              }
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-xs text-gray-600 truncate">
              {values.styles.color}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPane;
