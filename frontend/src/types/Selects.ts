interface selectOption {
    name: string | null;
    label: string | null;
}

const plantOptions: selectOption[] = [
    { name: "plantType", label: "Chinese Money Plant" },
    { name: "plantType", label: "Snake Grass" },
    { name: "plantType", label: "Prayer Plant" },
    { name: "plantType", label: "Snare Plant" }
]
// export plantOptions;

const frequencyOptions: selectOption[] = [
    { name: "frequency", label: "Daily" },
    { name: "frequency", label: "Weekly" },
    { name: "frequency", label: "Monthly" },
]
// export frequencyOptions;

const interval: selectOption[] = [
    { name: "interval", label: "1" },
    { name: "interval", label: "2" },
    { name: "interval", label: "3" },
    { name: "interval", label: "4" },
    { name: "interval", label: "5" },
    { name: "interval", label: "6" },
    { name: "interval", label: "7" },
]
// export interval;