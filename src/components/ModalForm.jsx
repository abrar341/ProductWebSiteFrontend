import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ModalForm = ({ fields, onClose, onSubmit, isSubmitting, error }) => {
    const initialFormData = fields.reduce((acc, field) => {
        acc[field.label.toLowerCase()] = field.defaultValue || "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    const [visibility, setVisibility] = useState(fields.map(() => false));
    const [fieldErrors, setFieldErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState({});

    const toggleVisibility = (index) => {
        setVisibility((prev) =>
            prev.map((visible, i) => (i === index ? !visible : visible))
        );
    };

    const handleChange = (fieldLabel, value) => {
        const key = fieldLabel.toLowerCase();
        setFormData((prevData) => ({ ...prevData, [key]: value }));
        setFieldErrors((prevErrors) => ({ ...prevErrors, [key]: null }));

        // Set image preview if file
        const field = fields.find(f => f.label.toLowerCase() === key);
        if (field?.type === "file" && value instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(value);
        }
    };

    const validateFields = () => {
        const errors = {};
        fields.forEach((field) => {
            const key = field.label.toLowerCase();
            const isEmpty =
                field.type === "file"
                    ? !formData[key]
                    : !formData[key] || formData[key].toString().trim() === "";

            if (isEmpty) {
                errors[key] = `${field.label} is required.`;
            }
        });
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {fields.map((field, index) => {
                    const key = field.label.toLowerCase();
                    return (
                        <div key={index} className="relative">
                            <label className="block text-sm font-medium mb-2 text-white">
                                {field.label}
                            </label>

                            {field.type === "file" ? (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleChange(field.label, e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-md bg-blue-800 text-white focus:outline-none"
                                    />
                                    {imagePreviews[key] && (
                                        <img
                                            src={imagePreviews[key]}
                                            alt="Preview"
                                            className="mt-2 h-24 object-contain border border-gray-300 rounded"
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="relative">
                                    <input
                                        type={
                                            field.type === "password" && !visibility[index]
                                                ? "password"
                                                : field.type || "text"
                                        }
                                        value={formData[key]}
                                        placeholder={field.placeholder}
                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                        className="w-full px-4 py-2 rounded-md bg-blue-800 text-white focus:outline-none"
                                    />
                                    {field.type === "password" && (
                                        <button
                                            type="button"
                                            onClick={() => toggleVisibility(index)}
                                            className="absolute right-3 top-2/4 transform -translate-y-2/4 text-white"
                                        >
                                            {visibility[index] ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    )}
                                </div>
                            )}

                            {fieldErrors[key] && (
                                <p className="text-red-500 text-sm mt-1">{fieldErrors[key]}</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {error && (
                <div className="mt-4 text-red-500 text-sm">
                    <strong>Error: </strong> {error}
                </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white ${isSubmitting
                        ? "bg-blue-400"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
};

ModalForm.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            type: PropTypes.string,
            defaultValue: PropTypes.string,
            placeholder: PropTypes.string,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    error: PropTypes.string,
};

export default ModalForm;
