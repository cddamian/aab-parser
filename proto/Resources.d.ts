import { BinaryReader, BinaryWriter } from '@bufbuild/protobuf/wire';
import { Configuration } from './Configuration';
/** A string pool that wraps the binary form of the C++ class android::ResStringPool. */
export interface StringPool {
    data: Uint8Array;
}
/** The position of a declared entity within a file. */
export interface SourcePosition {
    lineNumber: number;
    columnNumber: number;
}
/** Developer friendly source file information for an entity in the resource table. */
export interface Source {
    /** The index of the string path within the source string pool of a ResourceTable. */
    pathIdx: number;
    position: SourcePosition | undefined;
}
/** The name and version fingerprint of a build tool. */
export interface ToolFingerprint {
    tool: string;
    version: string;
}
/** Top level message representing a resource table. */
export interface ResourceTable {
    /**
     * The string pool containing source paths referenced throughout the resource table. This does
     * not end up in the final binary ARSC file.
     */
    sourcePool: StringPool | undefined;
    /** Resource definitions corresponding to an Android package. */
    package: Package[];
    /** The <overlayable> declarations within the resource table. */
    overlayable: Overlayable[];
    /** The version fingerprints of the tools that built the resource table. */
    toolFingerprint: ToolFingerprint[];
}
/** A package ID in the range [0x00, 0xff]. */
export interface PackageId {
    id: number;
}
/** Defines resources for an Android package. */
export interface Package {
    /**
     * The package ID of this package, in the range [0x00, 0xff].
     * - ID 0x00 is reserved for shared libraries, or when the ID is assigned at run-time.
     * - ID 0x01 is reserved for the 'android' package (framework).
     * - ID range [0x02, 0x7f] is reserved for auto-assignment to shared libraries at run-time.
     * - ID 0x7f is reserved for the application package.
     * - IDs > 0x7f are reserved for the application as well and are treated as feature splits.
     * This may not be set if no ID was assigned.
     */
    packageId: PackageId | undefined;
    /** The Java compatible Android package name of the app. */
    packageName: string;
    /** The series of types defined by the package. */
    type: Type[];
}
/** A type ID in the range [0x01, 0xff]. */
export interface TypeId {
    id: number;
}
/**
 * A set of resources grouped under a common type. Such types include string, layout, xml, dimen,
 * attr, etc. This maps to the second part of a resource identifier in Java (R.type.entry).
 */
export interface Type {
    /** The ID of the type. This may not be set if no ID was assigned. */
    typeId: TypeId | undefined;
    /**
     * The name of the type. This corresponds to the 'type' part of a full resource name of the form
     * package:type/entry. The set of legal type names is listed in Resource.cpp.
     */
    name: string;
    /** The entries defined for this type. */
    entry: Entry[];
}
/** The Visibility of a symbol/entry (public, private, undefined). */
export interface Visibility {
    level: Visibility_Level;
    /** The path at which this entry's visibility was defined (e.g. public.xml). */
    source: Source | undefined;
    /** The comment associated with the <public> tag. */
    comment: string;
}
/** The visibility of the resource outside its package. */
export declare enum Visibility_Level {
    /**
     * UNKNOWN - No visibility was explicitly specified. This is typically treated as private.
     * The distinction is important when two separate R.java files are generated: a public and
     * private one. An unknown visibility, in this case, would cause the resource to be omitted
     * from either R.java.
     */
    UNKNOWN = 0,
    /**
     * PRIVATE - A resource was explicitly marked as private. This means the resource can not be accessed
     * outside its package unless the @*package:type/entry notation is used (the asterisk being
     * the private accessor). If two R.java files are generated (private + public), the resource
     * will only be emitted to the private R.java file.
     */
    PRIVATE = 1,
    /**
     * PUBLIC - A resource was explicitly marked as public. This means the resource can be accessed
     * from any package, and is emitted into all R.java files, public and private.
     */
    PUBLIC = 2,
    UNRECOGNIZED = -1
}
export declare function visibility_LevelFromJSON(object: any): Visibility_Level;
export declare function visibility_LevelToJSON(object: Visibility_Level): string;
/**
 * Whether a resource comes from a compile-time overlay and is explicitly allowed to not overlay an
 * existing resource.
 */
export interface AllowNew {
    /** Where this was defined in source. */
    source: Source | undefined;
    /** Any comment associated with the declaration. */
    comment: string;
}
/** Represents a set of overlayable resources. */
export interface Overlayable {
    /** The name of the <overlayable>. */
    name: string;
    /** The location of the <overlayable> declaration in the source. */
    source: Source | undefined;
    /** The component responsible for enabling and disabling overlays targeting this <overlayable>. */
    actor: string;
}
/** Represents an overlayable <item> declaration within an <overlayable> tag. */
export interface OverlayableItem {
    /** The location of the <item> declaration in source. */
    source: Source | undefined;
    /** Any comment associated with the declaration. */
    comment: string;
    /** The policy defined by the enclosing <policy> tag of this <item>. */
    policy: OverlayableItem_Policy[];
    /**
     * The index into overlayable list that points to the <overlayable> tag that contains
     * this <item>.
     */
    overlayableIdx: number;
}
export declare enum OverlayableItem_Policy {
    NONE = 0,
    PUBLIC = 1,
    SYSTEM = 2,
    VENDOR = 3,
    PRODUCT = 4,
    SIGNATURE = 5,
    ODM = 6,
    OEM = 7,
    UNRECOGNIZED = -1
}
export declare function overlayableItem_PolicyFromJSON(object: any): OverlayableItem_Policy;
export declare function overlayableItem_PolicyToJSON(object: OverlayableItem_Policy): string;
/** An entry ID in the range [0x0000, 0xffff]. */
export interface EntryId {
    id: number;
}
/**
 * An entry declaration. An entry has a full resource ID that is the combination of package ID,
 * type ID, and its own entry ID. An entry on its own has no value, but values are defined for
 * various configurations/variants.
 */
export interface Entry {
    /**
     * The ID of this entry. Together with the package ID and type ID, this forms a full resource ID
     * of the form 0xPPTTEEEE, where PP is the package ID, TT is the type ID, and EEEE is the entry
     * ID.
     * This may not be set if no ID was assigned.
     */
    entryId: EntryId | undefined;
    /**
     * The name of this entry. This corresponds to the 'entry' part of a full resource name of the
     * form package:type/entry.
     */
    name: string;
    /** The visibility of this entry (public, private, undefined). */
    visibility: Visibility | undefined;
    /**
     * Whether this resource, when originating from a compile-time overlay, is allowed to NOT overlay
     * any existing resources.
     */
    allowNew: AllowNew | undefined;
    /** Whether this resource can be overlaid by a runtime resource overlay (RRO). */
    overlayableItem: OverlayableItem | undefined;
    /**
     * The set of values defined for this entry, each corresponding to a different
     * configuration/variant.
     */
    configValue: ConfigValue[];
}
/** A Configuration/Value pair. */
export interface ConfigValue {
    config: Configuration | undefined;
    value: Value | undefined;
}
/** The generic meta-data for every value in a resource table. */
export interface Value {
    /** Where the value was defined. */
    source: Source | undefined;
    /** Any comment associated with the value. */
    comment: string;
    /** Whether the value can be overridden. */
    weak: boolean;
    item?: Item | undefined;
    compoundValue?: CompoundValue | undefined;
}
/**
 * An Item is an abstract type. It represents a value that can appear inline in many places, such
 * as XML attribute values or on the right hand side of style attribute definitions. The concrete
 * type is one of the types below. Only one can be set.
 */
export interface Item {
    ref?: Reference | undefined;
    str?: String | undefined;
    rawStr?: RawString | undefined;
    styledStr?: StyledString | undefined;
    file?: FileReference | undefined;
    id?: Id | undefined;
    prim?: Primitive | undefined;
}
/**
 * A CompoundValue is an abstract type. It represents a value that is a made of other values.
 * These can only usually appear as top-level resources. The concrete type is one of the types
 * below. Only one can be set.
 */
export interface CompoundValue {
    attr?: Attribute | undefined;
    style?: Style | undefined;
    styleable?: Styleable | undefined;
    array?: Array | undefined;
    plural?: Plural | undefined;
}
/** A value that is a reference to another resource. This reference can be by name or resource ID. */
export interface Reference {
    type: Reference_Type;
    /** The resource ID (0xPPTTEEEE) of the resource being referred. This is optional. */
    id: number;
    /** The name of the resource being referred. This is optional if the resource ID is set. */
    name: string;
    /** Whether this reference is referencing a private resource (@*package:type/entry). */
    private: boolean;
}
export declare enum Reference_Type {
    /** REFERENCE - A plain reference (@package:type/entry). */
    REFERENCE = 0,
    /** ATTRIBUTE - A reference to a theme attribute (?package:type/entry). */
    ATTRIBUTE = 1,
    UNRECOGNIZED = -1
}
export declare function reference_TypeFromJSON(object: any): Reference_Type;
export declare function reference_TypeToJSON(object: Reference_Type): string;
/**
 * A value that represents an ID. This is just a placeholder, as ID values are used to occupy a
 * resource ID (0xPPTTEEEE) as a unique identifier. Their value is unimportant.
 */
export interface Id {
}
/** A value that is a string. */
export interface String {
    value: string;
}
/**
 * A value that is a raw string, which is unescaped/uninterpreted. This is typically used to
 * represent the value of a style attribute before the attribute is compiled and the set of
 * allowed values is known.
 */
export interface RawString {
    value: string;
}
/** A string with styling information, like html tags that specify boldness, italics, etc. */
export interface StyledString {
    /** The raw text of the string. */
    value: string;
    span: StyledString_Span[];
}
/** A Span marks a region of the string text that is styled. */
export interface StyledString_Span {
    /**
     * The name of the tag, and its attributes, encoded as follows:
     * tag_name;attr1=value1;attr2=value2;[...]
     */
    tag: string;
    /** The first character position this span applies to, in UTF-16 offset. */
    firstChar: number;
    /** The last character position this span applies to, in UTF-16 offset. */
    lastChar: number;
}
/** A value that is a reference to an external entity, like an XML file or a PNG. */
export interface FileReference {
    /** Path to a file within the APK (typically res/type-config/entry.ext). */
    path: string;
    /**
     * The type of file this path points to. For UAM bundle, this cannot be
     * BINARY_XML.
     */
    type: FileReference_Type;
}
export declare enum FileReference_Type {
    UNKNOWN = 0,
    PNG = 1,
    BINARY_XML = 2,
    PROTO_XML = 3,
    UNRECOGNIZED = -1
}
export declare function fileReference_TypeFromJSON(object: any): FileReference_Type;
export declare function fileReference_TypeToJSON(object: FileReference_Type): string;
/**
 * A value that represents a primitive data type (float, int, boolean, etc.).
 * Refer to Res_value in ResourceTypes.h for info on types and formatting
 */
export interface Primitive {
    nullValue?: Primitive_NullType | undefined;
    emptyValue?: Primitive_EmptyType | undefined;
    floatValue?: number | undefined;
    dimensionValue?: number | undefined;
    fractionValue?: number | undefined;
    intDecimalValue?: number | undefined;
    intHexadecimalValue?: number | undefined;
    booleanValue?: boolean | undefined;
    colorArgb8Value?: number | undefined;
    colorRgb8Value?: number | undefined;
    colorArgb4Value?: number | undefined;
    colorRgb4Value?: number | undefined;
    /** @deprecated */
    dimensionValueDeprecated?: number | undefined;
    /** @deprecated */
    fractionValueDeprecated?: number | undefined;
}
export interface Primitive_NullType {
}
export interface Primitive_EmptyType {
}
/** A value that represents an XML attribute and what values it accepts. */
export interface Attribute {
    /**
     * A bitmask of types that this XML attribute accepts. Corresponds to the flags in the
     * enum FormatFlags.
     */
    formatFlags: number;
    /**
     * The smallest integer allowed for this XML attribute. Only makes sense if the format includes
     * FormatFlags::INTEGER.
     */
    minInt: number;
    /**
     * The largest integer allowed for this XML attribute. Only makes sense if the format includes
     * FormatFlags::INTEGER.
     */
    maxInt: number;
    /**
     * The set of enums/flags defined in this attribute. Only makes sense if the format includes
     * either FormatFlags::ENUM or FormatFlags::FLAGS. Having both is an error.
     */
    symbol: Attribute_Symbol[];
}
/** A Symbol used to represent an enum or a flag. */
export interface Attribute_Symbol {
    /** Where the enum/flag item was defined. */
    source: Source | undefined;
    /** Any comments associated with the enum or flag. */
    comment: string;
    /**
     * The name of the enum/flag as a reference. Enums/flag items are generated as ID resource
     * values.
     */
    name: Reference | undefined;
    /** The value of the enum/flag. */
    value: number;
    /** The data type of the enum/flag as defined in android::Res_value. */
    type: number;
}
/** A value that represents a style. */
export interface Style {
    /** The optinal style from which this style inherits attributes. */
    parent: Reference | undefined;
    /** The source file information of the parent inheritance declaration. */
    parentSource: Source | undefined;
    /** The set of XML attribute/value pairs for this style. */
    entry: Style_Entry[];
}
/** An XML attribute/value pair defined in the style. */
export interface Style_Entry {
    /** Where the entry was defined. */
    source: Source | undefined;
    /** Any comments associated with the entry. */
    comment: string;
    /** A reference to the XML attribute. */
    key: Reference | undefined;
    /** The Item defined for this XML attribute. */
    item: Item | undefined;
}
/**
 * A value that represents a <declare-styleable> XML resource. These are not real resources and
 * only end up as Java fields in the generated R.java. They do not end up in the binary ARSC file.
 */
export interface Styleable {
    /** The set of attribute declarations. */
    entry: Styleable_Entry[];
}
/** An attribute defined for this styleable. */
export interface Styleable_Entry {
    /** Where the attribute was defined within the <declare-styleable> block. */
    source: Source | undefined;
    /** Any comments associated with the declaration. */
    comment: string;
    /** The reference to the attribute. */
    attr: Reference | undefined;
}
/** A value that represents an array of resource values. */
export interface Array {
    /** The list of array elements. */
    element: Array_Element[];
}
/** A single element of the array. */
export interface Array_Element {
    /** Where the element was defined. */
    source: Source | undefined;
    /** Any comments associated with the element. */
    comment: string;
    /** The value assigned to this element. */
    item: Item | undefined;
}
/** A value that represents a string and its many variations based on plurality. */
export interface Plural {
    /** The set of arity/plural mappings. */
    entry: Plural_Entry[];
}
/** The arity of the plural. */
export declare enum Plural_Arity {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    FEW = 3,
    MANY = 4,
    OTHER = 5,
    UNRECOGNIZED = -1
}
export declare function plural_ArityFromJSON(object: any): Plural_Arity;
export declare function plural_ArityToJSON(object: Plural_Arity): string;
/** The plural value for a given arity. */
export interface Plural_Entry {
    /** Where the plural was defined. */
    source: Source | undefined;
    /** Any comments associated with the plural. */
    comment: string;
    /** The arity of the plural. */
    arity: Plural_Arity;
    /** The value assigned to this plural. */
    item: Item | undefined;
}
/**
 * Defines an abstract XmlNode that must be either an XmlElement, or
 * a text node represented by a string.
 */
export interface XmlNode {
    element?: XmlElement | undefined;
    text?: string | undefined;
    /** Source line and column info. */
    source: SourcePosition | undefined;
}
/** An <element> in an XML document. */
export interface XmlElement {
    /** Namespaces defined on this element. */
    namespaceDeclaration: XmlNamespace[];
    /** The namespace URI of this element. */
    namespaceUri: string;
    /** The name of this element. */
    name: string;
    /** The attributes of this element. */
    attribute: XmlAttribute[];
    /** The children of this element. */
    child: XmlNode[];
}
/** A namespace declaration on an XmlElement (xmlns:android="http://..."). */
export interface XmlNamespace {
    prefix: string;
    uri: string;
    /** Source line and column info. */
    source: SourcePosition | undefined;
}
/** An attribute defined on an XmlElement (android:text="..."). */
export interface XmlAttribute {
    namespaceUri: string;
    name: string;
    value: string;
    /** Source line and column info. */
    source: SourcePosition | undefined;
    /** The optional resource ID (0xPPTTEEEE) of the attribute. */
    resourceId: number;
    /** The optional interpreted/compiled version of the `value` string. */
    compiledItem: Item | undefined;
}
export declare const StringPool: MessageFns<StringPool>;
export declare const SourcePosition: MessageFns<SourcePosition>;
export declare const Source: MessageFns<Source>;
export declare const ToolFingerprint: MessageFns<ToolFingerprint>;
export declare const ResourceTable: MessageFns<ResourceTable>;
export declare const PackageId: MessageFns<PackageId>;
export declare const Package: MessageFns<Package>;
export declare const TypeId: MessageFns<TypeId>;
export declare const Type: MessageFns<Type>;
export declare const Visibility: MessageFns<Visibility>;
export declare const AllowNew: MessageFns<AllowNew>;
export declare const Overlayable: MessageFns<Overlayable>;
export declare const OverlayableItem: MessageFns<OverlayableItem>;
export declare const EntryId: MessageFns<EntryId>;
export declare const Entry: MessageFns<Entry>;
export declare const ConfigValue: MessageFns<ConfigValue>;
export declare const Value: MessageFns<Value>;
export declare const Item: MessageFns<Item>;
export declare const CompoundValue: MessageFns<CompoundValue>;
export declare const Reference: MessageFns<Reference>;
export declare const Id: MessageFns<Id>;
export declare const String: MessageFns<String>;
export declare const RawString: MessageFns<RawString>;
export declare const StyledString: MessageFns<StyledString>;
export declare const StyledString_Span: MessageFns<StyledString_Span>;
export declare const FileReference: MessageFns<FileReference>;
export declare const Primitive: MessageFns<Primitive>;
export declare const Primitive_NullType: MessageFns<Primitive_NullType>;
export declare const Primitive_EmptyType: MessageFns<Primitive_EmptyType>;
export declare const Attribute: MessageFns<Attribute>;
export declare const Attribute_Symbol: MessageFns<Attribute_Symbol>;
export declare const Style: MessageFns<Style>;
export declare const Style_Entry: MessageFns<Style_Entry>;
export declare const Styleable: MessageFns<Styleable>;
export declare const Styleable_Entry: MessageFns<Styleable_Entry>;
export declare const Array: MessageFns<Array>;
export declare const Array_Element: MessageFns<Array_Element>;
export declare const Plural: MessageFns<Plural>;
export declare const Plural_Entry: MessageFns<Plural_Entry>;
export declare const XmlNode: MessageFns<XmlNode>;
export declare const XmlElement: MessageFns<XmlElement>;
export declare const XmlNamespace: MessageFns<XmlNamespace>;
export declare const XmlAttribute: MessageFns<XmlAttribute>;
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
    toJSON(message: T): any;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
