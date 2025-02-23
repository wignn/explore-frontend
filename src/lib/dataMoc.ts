export const book = [
    {
        id: '1',
        title: 'The Great Gatsby',
        cover: 'Nmoc.jpg',
        description: 'The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
        author: 'F. Scott Fitzgerald',
        updatedAt: '2021-09-01',
        chapter: 9,
        popular: true, // Tambahkan properti popular
        genre: [
            {
                id: '1',
                name: 'Fantasy',
            },
            {
                id: '2',
                name: 'Action',
            }
        ]
    },
    {
        id: '2',
        title: 'The Great Gatsby',
        cover: 'Nmoc.jpg',
        description: 'The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
        author: 'F. Scott Fitzgerald',
        updatedAt: '2021-09-01',
        chapter: 9,
        popular: false, // Tambahkan properti popular
        genre: [{
            id: '2',
            name: 'Action',
        }] // Pastikan genre selalu berupa array
    },
    {
        id: '3',
        title: 'The Great Gatsby',
        cover: 'Nmoc.jpg',
        description: 'The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
        author: 'F. Scott Fitzgerald',
        updatedAt: '2021-09-01',
        chapter: 9,
        popular: false, 
        genre: [{
            id: '3',
            name: 'Romance',
        }] 
    },
];
export const genre = [
    {
        id: '1',
        name: 'Fantasy',
    },
    {
        id: '2',
        name: 'Action',
    },
    {
        id: '3',
        name: 'Romance',
    },
];

export const user = {
        id:"aisdj21",
        profilePicture:"/pMoc.png",
        username:"wign",
        email:"wign@exemple.com",
        name:"wign",
        password:"123456",
        bio:"exemole",
        createdAt:"2021-09-01",
        updatedAt:"2021-09-01",
        lastLogin:"2021-09-01",
        token:"",
        valToken:"",
        isAdmin:true,
    
}