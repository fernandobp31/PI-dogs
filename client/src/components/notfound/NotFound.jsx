import style from "../notfound/notFound.module.css"

export default function NotFound() {
    return(
        <div className={style.mainContainer}>            

            <h1>Are you lost?</h1>
            <h2>Page not found</h2>
            <img className={style.gifimg} src={"https://media.tenor.com/z9jqKv2mJ9cAAAAM/what-confused.gif"} alt={'Not found'} />

        </div>
    )
}