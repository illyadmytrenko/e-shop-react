import { BottomItem } from "./ui/bottom-item";

export function BottomList() {
  return (
    <ul className="text-xl flex flex-wrap gap-4 justify-between mt-10 md:mt-16">
      <BottomItem
        name="monitor"
        text="Latest and Greatest tech"
        width={40}
        height={35}
      />
      <BottomItem name="shield" text="Guarantee" width={40} height={45} />
      <BottomItem
        name="truck"
        text="Free Shiping over 1000$"
        width={60}
        height={30}
      />
      <BottomItem name="timer" text="24/7 Support" width={40} height={45} />
    </ul>
  );
}
