import getCurrentUser from '@/utils/getCurrentUser'
export default  async function Home() {
  const session = await getCurrentUser();
  console.log(session)
  return (
    
    <main>
    </main>
  )
}
