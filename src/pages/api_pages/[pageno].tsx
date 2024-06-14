export const getStaticPaths = async () =>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    const paths = data.map((curElem) => {
        return {
            params: {
                pageno: curElem.id.toString();
            },
        }
    });

    return {
        paths,
        fallback: false,
    }
} 

export const getStaticProps = async (context) => {
    // Fetch data from the API
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    // Return the fetched data as props
    return {
        props: {
            data,
        },
    };
};


const myData = () => {
    return(
        <>
          <h1>Hello Dynamic</h1>
        </>
    )
}

export default myData;