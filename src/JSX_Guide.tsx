const App = () => {
    // define variables within the scope of function that is returning the component
    const name = "Thabang";
    const x = 5;
    const y = 3;
    const names = ["Thabang", "Tshepi", "Samke", "Palesa"];
    const styles = {
        color: 'red',
        fontSize: '55px'
    }

    return (
        /* must make sure that the returned component is wrapped in a parent tag, can be a fragment: <></> */
        <>
            <div className='text-5xl'>App</div>
            
            {/* embed values dynamically and inline-styling the elem */}
            <p style={{color: 'red', fontSize: '24px'}}>Greetings {name}</p>
            {/* pre-defined styles */}
            <p style={styles}>Another Greeting from {name}</p>

            {/*Math operations*/}
            <p>
                The sum of {x} and {y} is {x + y}
            </p>

            {/* Loop through an array to create a list:  */}
            <h5>List of names:</h5>
            <ul>
                {names.map((name, index) => {
                    return <li key={index}>{name}</li>;
                })}
            </ul>
        </>
    )
}

export default App