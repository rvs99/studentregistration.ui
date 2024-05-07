import React, { useState } from 'react';

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    department: number;
}

const departments = [
    { name: 'Computer Science', value: 1001 },
    { name: 'Mechanical Engineering', value: 1002 },
    { name: 'Electrical Engineering', value: 1003 }];

const StudentRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        department: 1001
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        const parsedValue = !Number.isNaN(parseInt(value)) ? parseInt(value) : e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [name]: parsedValue
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const url = 'https://localhost:7031/StudentRegistration';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNzQ2NTcwMDU3LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWQxIn0.AE--Vp1429MrY1ssUdSw_c45n3s7kM_EIaWqgdeFmv8`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseBody = await response.json();
                setMessage('Registration successful. Registration ID: ' + responseBody);
            } else {
                setMessage('Something went wrong!');
            }
        } catch (error) {
            setMessage('Something went wrong!');
        }
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name:</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name:</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                <div className="col-sm-10">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username:</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                <div className="col-sm-10">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="department" className="col-sm-2 col-form-label">Department:</label>
                <div className="col-sm-10">
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(department => (
                            <option key={department.value} value={department.value}>{department.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-mb-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
            <div className='row mb-3'>
                <div>{message}</div>
            </div>
        </form>
    );
};

export default StudentRegistrationForm;
