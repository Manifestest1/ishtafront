import Link from "next/link";
export const getStaticProps = async () => {
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

// Component that receives data as props and renders it
const Blogget = ({ data }) => {
    return(
     <>
        <h1>Test Get Api</h1>
        {
            // Map through the data and render each item
            data.slice(0,5).map((curElem) => {
                return (
                <div key={curElem.id}>
                  <h3>{curElem.id}</h3>
                  <Link href={`/api_pages/${curElem.id}`}>
                      <h3>{curElem.title}</h3>
                  </Link>
                </div>
                );
            })
        }
     </>
    )
}

export default Blogget;
