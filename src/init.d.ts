interface MenuItem {
  id?: number;
  name?: string;
  is_active?: boolean;
}

interface CardData {
  description?: string;
  id?: number;
  is_active?: boolean;
  is_income?: boolean;
  nominal?: number;
  id_menu?: number;
  created_at: string | number | Date;
}

interface Result {
  total?: number;
  min?: number;
  max?: number;
}

type setActiveHand = (name: string) => void;

type RemoveData = (id: number) => void;

type getNewIdHand = (id: number) => void;
