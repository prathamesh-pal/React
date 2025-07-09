import PropTypes from 'prop-types';


function Usergreeting (props){
    // if (props.islogin){
    //     return <h1>Wellcome to my Webpage {props.username}</h1>
    // }
    // else {
    //     return <h1>Please Login</h1>
    // }
    return (props.islogin ? <h1 className="Wellcome" >Wellcome {props.username}</h1> :
                            <h2 className="login">Please login {props.username}</h2>)

}

Usergreeting.PropTypes = {
    username : PropTypes.string.isRequired,
    islogin : PropTypes.bool
}

Usergreeting.defaultProps = {
    username : "Guest",
    islogin : false
    
}

export default Usergreeting