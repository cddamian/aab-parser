import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
export declare const protobufPackage = "aapt.pb";
/**
 * Copyright (C) 2017 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A description of the requirements a device must have in order for a
 * resource to be matched and selected.
 */
export interface Configuration {
    /**
     * Axis/dimensions that are understood by the runtime.
     *
     * Mobile country code.
     */
    mcc: number;
    /** Mobile network code. */
    mnc: number;
    /** BCP-47 locale tag. */
    locale: string;
    /** Left-to-right, right-to-left... */
    layoutDirection: Configuration_LayoutDirection;
    /** Screen width in pixels. Prefer screen_width_dp. */
    screenWidth: number;
    /** Screen height in pixels. Prefer screen_height_dp. */
    screenHeight: number;
    /** Screen width in density independent pixels (dp). */
    screenWidthDp: number;
    /** Screen height in density independent pixels (dp). */
    screenHeightDp: number;
    /** The smallest screen dimension, regardless of orientation, in dp. */
    smallestScreenWidthDp: number;
    /** Whether the device screen is classified as small, normal, large, xlarge. */
    screenLayoutSize: Configuration_ScreenLayoutSize;
    /** Whether the device screen is long. */
    screenLayoutLong: Configuration_ScreenLayoutLong;
    /** Whether the screen is round (Android Wear). */
    screenRound: Configuration_ScreenRound;
    /** Whether the screen supports wide color gamut. */
    wideColorGamut: Configuration_WideColorGamut;
    /** Whether the screen has high dynamic range. */
    hdr: Configuration_Hdr;
    /** Which orientation the device is in (portrait, landscape). */
    orientation: Configuration_Orientation;
    /** Which type of UI mode the device is in (television, car, etc.). */
    uiModeType: Configuration_UiModeType;
    /** Whether the device is in night mode. */
    uiModeNight: Configuration_UiModeNight;
    /** The device's screen density in dots-per-inch (dpi). */
    density: number;
    /** Whether a touchscreen exists, supports a stylus, or finger. */
    touchscreen: Configuration_Touchscreen;
    /**
     * Whether the keyboard hardware keys are currently hidden, exposed, or
     * if the keyboard is a software keyboard.
     */
    keysHidden: Configuration_KeysHidden;
    /** The type of keyboard present (none, QWERTY, 12-key). */
    keyboard: Configuration_Keyboard;
    /** Whether the navigation is exposed or hidden. */
    navHidden: Configuration_NavHidden;
    /**
     * The type of navigation present on the device
     * (trackball, wheel, dpad, etc.).
     */
    navigation: Configuration_Navigation;
    /** The minimum SDK version of the device. */
    sdkVersion: number;
    /** Grammatical gender. */
    grammaticalGender: Configuration_GrammaticalGender;
    /** Build-time only dimensions. */
    product: string;
}
export declare enum Configuration_LayoutDirection {
    LAYOUT_DIRECTION_UNSET = 0,
    LAYOUT_DIRECTION_LTR = 1,
    LAYOUT_DIRECTION_RTL = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_LayoutDirectionFromJSON(object: any): Configuration_LayoutDirection;
export declare function configuration_LayoutDirectionToJSON(object: Configuration_LayoutDirection): string;
export declare enum Configuration_ScreenLayoutSize {
    SCREEN_LAYOUT_SIZE_UNSET = 0,
    SCREEN_LAYOUT_SIZE_SMALL = 1,
    SCREEN_LAYOUT_SIZE_NORMAL = 2,
    SCREEN_LAYOUT_SIZE_LARGE = 3,
    SCREEN_LAYOUT_SIZE_XLARGE = 4,
    UNRECOGNIZED = -1
}
export declare function configuration_ScreenLayoutSizeFromJSON(object: any): Configuration_ScreenLayoutSize;
export declare function configuration_ScreenLayoutSizeToJSON(object: Configuration_ScreenLayoutSize): string;
export declare enum Configuration_ScreenLayoutLong {
    SCREEN_LAYOUT_LONG_UNSET = 0,
    SCREEN_LAYOUT_LONG_LONG = 1,
    SCREEN_LAYOUT_LONG_NOTLONG = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_ScreenLayoutLongFromJSON(object: any): Configuration_ScreenLayoutLong;
export declare function configuration_ScreenLayoutLongToJSON(object: Configuration_ScreenLayoutLong): string;
export declare enum Configuration_ScreenRound {
    SCREEN_ROUND_UNSET = 0,
    SCREEN_ROUND_ROUND = 1,
    SCREEN_ROUND_NOTROUND = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_ScreenRoundFromJSON(object: any): Configuration_ScreenRound;
export declare function configuration_ScreenRoundToJSON(object: Configuration_ScreenRound): string;
export declare enum Configuration_WideColorGamut {
    WIDE_COLOR_GAMUT_UNSET = 0,
    WIDE_COLOR_GAMUT_WIDECG = 1,
    WIDE_COLOR_GAMUT_NOWIDECG = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_WideColorGamutFromJSON(object: any): Configuration_WideColorGamut;
export declare function configuration_WideColorGamutToJSON(object: Configuration_WideColorGamut): string;
export declare enum Configuration_Hdr {
    HDR_UNSET = 0,
    HDR_HIGHDR = 1,
    HDR_LOWDR = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_HdrFromJSON(object: any): Configuration_Hdr;
export declare function configuration_HdrToJSON(object: Configuration_Hdr): string;
export declare enum Configuration_Orientation {
    ORIENTATION_UNSET = 0,
    ORIENTATION_PORT = 1,
    ORIENTATION_LAND = 2,
    ORIENTATION_SQUARE = 3,
    UNRECOGNIZED = -1
}
export declare function configuration_OrientationFromJSON(object: any): Configuration_Orientation;
export declare function configuration_OrientationToJSON(object: Configuration_Orientation): string;
export declare enum Configuration_UiModeType {
    UI_MODE_TYPE_UNSET = 0,
    UI_MODE_TYPE_NORMAL = 1,
    UI_MODE_TYPE_DESK = 2,
    UI_MODE_TYPE_CAR = 3,
    UI_MODE_TYPE_TELEVISION = 4,
    UI_MODE_TYPE_APPLIANCE = 5,
    UI_MODE_TYPE_WATCH = 6,
    UI_MODE_TYPE_VRHEADSET = 7,
    UNRECOGNIZED = -1
}
export declare function configuration_UiModeTypeFromJSON(object: any): Configuration_UiModeType;
export declare function configuration_UiModeTypeToJSON(object: Configuration_UiModeType): string;
export declare enum Configuration_UiModeNight {
    UI_MODE_NIGHT_UNSET = 0,
    UI_MODE_NIGHT_NIGHT = 1,
    UI_MODE_NIGHT_NOTNIGHT = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_UiModeNightFromJSON(object: any): Configuration_UiModeNight;
export declare function configuration_UiModeNightToJSON(object: Configuration_UiModeNight): string;
export declare enum Configuration_Touchscreen {
    TOUCHSCREEN_UNSET = 0,
    TOUCHSCREEN_NOTOUCH = 1,
    TOUCHSCREEN_STYLUS = 2,
    TOUCHSCREEN_FINGER = 3,
    UNRECOGNIZED = -1
}
export declare function configuration_TouchscreenFromJSON(object: any): Configuration_Touchscreen;
export declare function configuration_TouchscreenToJSON(object: Configuration_Touchscreen): string;
export declare enum Configuration_KeysHidden {
    KEYS_HIDDEN_UNSET = 0,
    KEYS_HIDDEN_KEYSEXPOSED = 1,
    KEYS_HIDDEN_KEYSHIDDEN = 2,
    KEYS_HIDDEN_KEYSSOFT = 3,
    UNRECOGNIZED = -1
}
export declare function configuration_KeysHiddenFromJSON(object: any): Configuration_KeysHidden;
export declare function configuration_KeysHiddenToJSON(object: Configuration_KeysHidden): string;
export declare enum Configuration_Keyboard {
    KEYBOARD_UNSET = 0,
    KEYBOARD_NOKEYS = 1,
    KEYBOARD_QWERTY = 2,
    KEYBOARD_TWELVEKEY = 3,
    UNRECOGNIZED = -1
}
export declare function configuration_KeyboardFromJSON(object: any): Configuration_Keyboard;
export declare function configuration_KeyboardToJSON(object: Configuration_Keyboard): string;
export declare enum Configuration_NavHidden {
    NAV_HIDDEN_UNSET = 0,
    NAV_HIDDEN_NAVEXPOSED = 1,
    NAV_HIDDEN_NAVHIDDEN = 2,
    UNRECOGNIZED = -1
}
export declare function configuration_NavHiddenFromJSON(object: any): Configuration_NavHidden;
export declare function configuration_NavHiddenToJSON(object: Configuration_NavHidden): string;
export declare enum Configuration_Navigation {
    NAVIGATION_UNSET = 0,
    NAVIGATION_NONAV = 1,
    NAVIGATION_DPAD = 2,
    NAVIGATION_TRACKBALL = 3,
    NAVIGATION_WHEEL = 4,
    UNRECOGNIZED = -1
}
export declare function configuration_NavigationFromJSON(object: any): Configuration_Navigation;
export declare function configuration_NavigationToJSON(object: Configuration_Navigation): string;
export declare enum Configuration_GrammaticalGender {
    GRAM_GENDER_USET = 0,
    GRAM_GENDER_NEUTER = 1,
    GRAM_GENDER_FEMININE = 2,
    GRAM_GENDER_MASCULINE = 3,
    UNRECOGNIZED = -1
}
export declare function configuration_GrammaticalGenderFromJSON(object: any): Configuration_GrammaticalGender;
export declare function configuration_GrammaticalGenderToJSON(object: Configuration_GrammaticalGender): string;
export declare const Configuration: MessageFns<Configuration>;
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
