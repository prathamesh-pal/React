import PropTypes from 'prop-types';


function Student (props){
    return(
        <div>
            <p>
                Name: {props.name}
            </p>
            <p>Age: {props.age}</p>
            <p>Student : {props.isStudent ? "Yes" : "No"}</p>
        </div>
    )

};

Student.propTypes = {
  name: PropTypes.string.isRequired,  // must be a string and required
  age: PropTypes.number,              // optional number
  isStudent: PropTypes.bool             // optional boolean
};


export default Student