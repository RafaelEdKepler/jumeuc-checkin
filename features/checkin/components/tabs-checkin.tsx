import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { TabsCheckinComponentProps } from "../types";
import FormFieldsComponent from "./form-fields";

export default function TabsCheckinComponent({storedNames, loading, selectedTab, setSelectedTab} : TabsCheckinComponentProps) {

    return (
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
                {storedNames.length > 0 ? (
                    <>
                        <TabsTrigger value="storedNames">Olá, {storedNames[storedNames.length - 1]}!</TabsTrigger>
                        <TabsTrigger value="newName">Outro nome?</TabsTrigger>
                    </>
                ) : (
                    <TabsTrigger value="newName">Seja bem-vindo!</TabsTrigger>
                )}
            </TabsList>
            <TabsContent value="newName">
                <FormFieldsComponent disabled={false} loading={loading} storedNames={storedNames} />
            </TabsContent>
            <TabsContent value="storedNames">
                <FormFieldsComponent disabled={true} loading={loading} storedNames={storedNames} />
            </TabsContent>
        </Tabs>
    )
}