export const ErrorMessage = ({ error, errors }: { error?: { message?: string }, errors?: string[] }) => {
    if (!error && !errors?.length) {
        return
    }

    const list = errors?.length ? errors : [error?.message]

    return <ul className="error-messages">
        {
            list.map(error => {
                return <li key={error}>{error}</li>
            })
        }
    </ul>
}