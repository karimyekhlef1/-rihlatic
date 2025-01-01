"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { setOmraDepartureId } from "@/lib/store/custom/commonSlices/omraReservationSlice";
import { store } from "@/lib/store/store";

interface Departure {
  id: number;
  date: string;
  duration: string;
  seats: number;
  price: string;
  selected: boolean;
}

interface DepartureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: () => void;
  onDelete: () => void;
}

export default function DepartureDialog({
  open,
  onOpenChange,
  onSelect,
  onDelete,
}: DepartureDialogProps) {
  const [departures, setDepartures] = useState<Departure[]>([
    {
      // Only ID working in the API is 4 at the moment
      id: 4,
      date: "15-janvier-2025",
      duration: "14 nuits / 15 jours",
      seats: 9,
      price: "250 000,00 DZD /Pers",
      selected: false,
    },
  ]);

  const dispatch = useDispatch();

  const handleSelect = (id: number) => {
    dispatch(setOmraDepartureId(id));
    setDepartures(
      departures.map((dep) =>
        dep.id === id ? { ...dep, selected: !dep.selected } : dep
      )
    );
    onSelect();
    onOpenChange(false);

    // Log the ID of the selected departure state from the store directly
    const omraDepartureId =
      store.getState().omreaReservationInfos.omra_departure_id;
    console.log("Omra departure ID state:", omraDepartureId);
  };

  const handleDelete = (id: number) => {
    setDepartures(
      departures.map((dep) =>
        dep.id === id ? { ...dep, selected: false } : dep
      )
    );
    onDelete();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Departures
            <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-orange-100 text-orange-600">
              {departures.length}
            </span>
          </DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure on</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Available seats</TableHead>
              <TableHead>Initial price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departures.map((departure) => (
              <TableRow key={departure.id}>
                <TableCell>{departure.date}</TableCell>
                <TableCell>{departure.duration}</TableCell>
                <TableCell>{departure.seats}</TableCell>
                <TableCell>{departure.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => handleSelect(departure.id)}
                      variant="outline"
                      className={
                        departure.selected
                          ? "bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700"
                          : "hover:bg-orange-50 hover:text-orange-600"
                      }
                    >
                      {departure.selected ? "Selected" : "Select"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(departure.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
