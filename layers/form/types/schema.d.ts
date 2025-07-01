declare global {
    type SchemaType = "object"
    type SchemaPropertiesSize = "sm" | "md" | "lg"

    interface ISchema {
        title: string
        description: string
        type: SchemaType
        properties: {
            [key: string]: ISchemaProperties
        },
        required: Array<keyof ISchema["properties"]>
    }

    interface ISchemaProperties {
        type: string
        label: string
        placeholder: string
        size: SchemaPropertiesSize
    }
}

export {}