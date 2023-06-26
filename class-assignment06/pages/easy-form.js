import React from "react";
import { useForm } from 'react-hook-form';

export default function EasyForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        formState,
    } = useForm({ mode: 'onChange' });

    // Set up default values for the form
    const defaultValues = {
        studentId: '',
        name: '',
        gender: 'M',
        courses: ['WEB422', 'PMC213'],
    };

    // Set up initial values for the form state
    React.useEffect(() => {
        setValue('studentId', defaultValues.studentId);
        setValue('name', defaultValues.name);
        setValue('gender', defaultValues.gender);
        setValue('courses', defaultValues.courses);
    }, [setValue]);

    const onSubmit = (data) => {
        console.log(data);
        // You can perform additional logic with the form data here
    };

    return (
        <div>
            <h1>Easy Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="studentId">Student ID:</label>
                    <input
                        type="text"
                        id="studentId"
                        {...register('studentId', {
                            required: 'This field is required.',
                            pattern: {
                                value: /^\d{10}$/,
                                message: 'Please enter a 10-digit student ID.',
                            },
                        })}
                    />
                    {errors.studentId && (
                        <p className="error-message">{errors.studentId.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', {
                            required: 'This field is required.',
                            pattern: {
                                value: /^[A-Za-z .]+$/,
                                message: 'Please enter a valid name.',
                            },
                        })}
                    />
                    {errors.name && (
                        <p className="error-message">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label>Gender:</label>
                    <label htmlFor="male">
                        <input
                            type="radio"
                            id="male"
                            value="M"
                            {...register('gender', { required: true })}
                        />
                        Male
                    </label>
                    <label htmlFor="female">
                        <input
                            type="radio"
                            id="female"
                            value="F"
                            {...register('gender', { required: true })}
                        />
                        Female
                    </label>
                    {errors.gender && (
                        <p className="error-message">This field is required.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="courses">Courses:</label>
                    <select
                        id="courses"
                        multiple
                        {...register('courses', {
                            required: 'This field is required.',
                        })}
                    >
                        <option value="WEB422">WEB422</option>
                        <option value="PMC213">PMC213</option>
                        <option value="YFB234">YFB234</option>
                        <option value="UNV324">UNV324</option>
                    </select>
                    {errors.courses && (
                        <p className="error-message">{errors.courses.message}</p>
                    )}
                </div>

                <button type="submit" disabled={!formState.isValid}>
                    Submit
                </button>
            </form>
        </div>
    );
};