import { useEffect, useState } from 'react'

interface Book {
  title: string
}

function Books() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch('https://bookshelves.ink/api/books')
      const body = await response.json()

      setBooks(body.data)
    }

    fetchApi()
  }, [])

  return books.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div>
      {books.map((book, i) => (
        <div key={i}>{book.title}</div>
      ))}
    </div>
  )
}

export default Books
