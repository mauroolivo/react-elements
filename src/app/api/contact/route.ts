// import { type NextRequest } from 'next/server';
// import { insertContact } from '@/query/query';

// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   console.log('RH', data);
//   const result = await insertContact(data);
//   console.log('RH', result);
//   if (result.ok) {
//     return Response.json({}, { status: 201 });
//   }
//   return Response.json({}, { status: 500 });
// }

// unused now, this was used. from client side form submission

// export function ContactForm() {
//     const { push } = useRouter();
//     async function handleAction( formData: FormData ) {
//         const contact = Object.fromEntries(formData) as Contact;

//         const response = await fetch('/api/contact', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(contact),
//         });
//         if (response.ok) {
//             push('/contact/thanks/?name=' + encodeURIComponent(contact.name));
//         } else {
//             alert('There was an error submitting the form. Please try again later.');
//         }

//     }
//   return (
//     <form
//       action={handleAction}
