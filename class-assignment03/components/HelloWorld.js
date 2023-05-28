
export default function Hello(props) {
    return (
        <p>
            Hello World from {props.city} {props.province}!

        </p>
    );
}

Hello.defaultProps = {
    city: 'North York',
    province: 'Ontario',
};