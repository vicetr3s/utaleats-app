import {COLORS, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

type props = {
    fill: boolean;

}
export default function Star({fill}: props) {
    const iconName = fill ? 'star' : 'star-outline';

    return (
        <Ionicons
            name={iconName}
            color={COLORS.primary}
            size={MISC.largeIconSize}
        />
    )
}