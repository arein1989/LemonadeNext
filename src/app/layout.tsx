
import './globals.css';
import { LemonProvider } from '@/context/LemonContext';
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>
           <header>
           <LemonProvider>{children}</LemonProvider>
           </header>
         </body>
       </html>
     );
   }