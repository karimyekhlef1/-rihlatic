// "use client";

// import { useForm, useFieldArray } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { updatePassenger } from "@/lib/store/custom/commonSlices/omraReservationSlice";
// import { RootState } from "@/lib/store/store";

// interface PassengerFormData {
//   email: string;
//   phone: string;
//   first_name: string;
//   last_name: string;
//   sex: "male" | "female";
//   passport_nbr: string;
//   passport_expire_at: string;
//   passport_scan: string;
//   birth_date: string;
// }

// export default function OmraReservationInformation() {
//   const dispatch = useDispatch();
//   const rooms = useSelector((state: RootState) => state.omreaReservationInfos.rooms);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data: any) => {
//     console.log("Form submitted:", data);
//     // You can dispatch actions here to save the data
//   };

//   const renderPassengerForm = (
//     roomIndex: number,
//     passengerType: "adults" | "children" | "infants",
//     passengerIndex: number
//   ) => {
//     const fieldPrefix = `rooms.${roomIndex}.${passengerType}.${passengerIndex}`;

//     return (
//       <div key={`${roomIndex}-${passengerType}-${passengerIndex}`} className="space-y-6 border p-4 rounded-lg mb-4">
//         <h3 className="text-lg font-semibold capitalize">
//           Room {roomIndex + 1} - {passengerType} {passengerIndex + 1}
//         </h3>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor={`${fieldPrefix}.first_name`}>First Name</Label>
//             <Input
//               {...register(`${fieldPrefix}.first_name`, {
//                 required: "First name is required",
//               })}
//             />
//           </div>

//           <div>
//             <Label htmlFor={`${fieldPrefix}.last_name`}>Last Name</Label>
//             <Input
//               {...register(`${fieldPrefix}.last_name`, {
//                 required: "Last name is required",
//               })}
//             />
//           </div>

//           <div>
//             <Label htmlFor={`${fieldPrefix}.email`}>Email</Label>
//             <Input
//               type="email"
//               {...register(`${fieldPrefix}.email`, {
//                 required: "Email is required",
//               })}
//             />
//           </div>

//           <div>
//             <Label htmlFor={`${fieldPrefix}.phone`}>Phone</Label>
//             <Input
//               {...register(`${fieldPrefix}.phone`, {
//                 required: "Phone is required",
//               })}
//             />
//           </div>

//           <div>
//             <Label>Sex</Label>
//             <RadioGroup
//               defaultValue="male"
//               className="flex gap-4"
//               {...register(`${fieldPrefix}.sex`)}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="male" id={`${fieldPrefix}.sex.male`} />
//                 <Label htmlFor={`${fieldPrefix}.sex.male`}>Male</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="female" id={`${fieldPrefix}.sex.female`} />
//                 <Label htmlFor={`${fieldPrefix}.sex.female`}>Female</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           <div>
//             <Label htmlFor={`${fieldPrefix}.birth_date`}>Birth Date</Label>
//             <Input
//               type="date"
//               {...register(`${fieldPrefix}.birth_date`, {
//                 required: "Birth date is required",
//               })}
//             />
//           </div>

//           <div>
//             <Label htmlFor={`${fieldPrefix}.passport_nbr`}>Passport Number</Label>
//             <Input
//               {...register(`${fieldPrefix}.passport_nbr`, {
//                 required: "Passport number is required",
//               })}
//             />
//           </div>

//           <div>
//             <Label htmlFor={`${fieldPrefix}.passport_expire_at`}>
//               Passport Expiry Date
//             </Label>
//             <Input
//               type="date"
//               {...register(`${fieldPrefix}.passport_expire_at`, {
//                 required: "Passport expiry date is required",
//               })}
//             />
//           </div>

//           <div className="col-span-2">
//             <Label htmlFor={`${fieldPrefix}.passport_scan`}>Passport Scan</Label>
//             <Input
//               type="file"
//               accept="image/*,.pdf"
//               {...register(`${fieldPrefix}.passport_scan`, {
//                 required: "Passport scan is required",
//               })}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto px-4">
//       <ScrollArea className="max-h-[70vh]">
//         {rooms.map((room, roomIndex) => (
//           <div key={roomIndex}>
//             {room.passengers.adults.map((_, passengerIndex) =>
//               renderPassengerForm(roomIndex, "adults", passengerIndex)
//             )}
//             {room.passengers.children.map((_, passengerIndex) =>
//               renderPassengerForm(roomIndex, "children", passengerIndex)
//             )}
//             {room.passengers.infants.map((_, passengerIndex) =>
//               renderPassengerForm(roomIndex, "infants", passengerIndex)
//             )}
//           </div>
//         ))}
//       </ScrollArea>

//       <Button
//         type="submit"
//         className="w-full mt-6 bg-orange-600 text-white hover:bg-orange-700"
//       >
//         Save All Passenger Information
//       </Button>
//     </form>
//   );
// }
