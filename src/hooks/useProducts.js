import { useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  async function uploadImage(file) {
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  async function addProduct(data, imageFile) {
    let imageUrl = data.imageUrl || ''
    if (imageFile) imageUrl = await uploadImage(imageFile)
    await addDoc(collection(db, 'products'), {
      ...data,
      imageUrl,
      createdAt: serverTimestamp()
    })
  }

  async function updateProduct(id, data, imageFile) {
    let imageUrl = data.imageUrl
    if (imageFile) imageUrl = await uploadImage(imageFile)
    const docRef = doc(db, 'products', id)
    await updateDoc(docRef, { ...data, imageUrl })
  }

  async function deleteProduct(id, imageUrl) {
    await deleteDoc(doc(db, 'products', id))
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl)
        await deleteObject(imageRef)
      } catch (_) {}
    }
  }

  return { products, loading, addProduct, updateProduct, deleteProduct }
}
