import React from 'react';

const Errors = ({errors}) => (
    <div>
        { errors.length ?
            <div>
                <h3>Total of {errors.length} error(s)</h3>
                <ul className="errors">
                    {errors.map((error, x) => (
                        <li key={x} className="error">
                            <span className="error_text">{error.message}</span>
                        </li>
                    ))}
                </ul>
            </div>
            : ''
        }
    </div>
);

export default Errors;





