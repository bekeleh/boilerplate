<template>
    <div class="mt-2 sm:col-span-6">
        <VeeForm :validation-schema="schema">
            <table>
                <tr>
                    <th>Item type/model</th>
                    <th>Quantity</th>
                    <th>Power/Unit(w)</th>
                    <th>Total(w)</th>
                </tr>
                <tbody>
                    <tr
                        v-for="(powerOption, powerOptionIndx) in objOptions"
                        :key="powerOptionIndx"
                    >
                        <td>
                            <input
                                v-model="powerOption.description"
                                class="w-56 shadow-sm focus:ring-et-green focus:border-et-green block w-full sm:text-sm border border-gray-300 rounded-md"
                                type="text"
                            />
                        </td>
                        <td>
                            <input
                                v-model="powerOption.quantity"
                                class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                type="number"
                            />
                        </td>
                        <td>
                            <input
                                v-model="powerOption.power"
                                class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                type="number"
                                @input="
                                    totalPower(
                                        powerOptionIndx,
                                        powerOption.quantity,
                                        powerOption.power
                                    )
                                "
                            />
                        </td>
                        <td>
                            {{ powerOption.quantity * powerOption.power }}
                            <!-- <input
                                v-model="powerOption.total"
                                readonly
                                class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                type="text"
                            /> -->
                        </td>
                        <td v-if="objOptions.length > 0">
                            <button
                                type="button"
                                class="order-0 flex items-center pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                                @click="removePowerOptions(powerOptionIndx)"
                            >
                                <MinusIcon class="h-4 w-4 mr-1" />
                                Remove
                            </button>
                        </td>
                    </tr>

                    <tr class="flex mx-auto m-3">
                        <button
                            type="button"
                            class="order-0 flex items-center pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                            @click="addPowerOptions()"
                        >
                            <PlusIcon class="h-4 w-4 mr-1" />
                            Add more
                        </button>
                    </tr>
                </tbody>
            </table>
            <!-- pdu type -->
            <div class="sm:col-span-3">
                <label
                    for="pdu_type"
                    class="block text-sm font-medium text-gray-700"
                >
                    PDU type<span class="text-red-500">***</span>
                </label>
                <div class="mt-1">
                    <VeeField
                        id="pdu_type"
                        v-model="power.pdu_type"
                        type="text"
                        name="pdu_type"
                        rules="required"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <ErrorMessage name="pdu_type" class="text-red-600" />
            </div>

            <!-- Number of PDU in the rack -->
            <div class="sm:col-span-3">
                <label
                    for="number_of_pdu_in_rack"
                    class="block text-sm font-medium text-gray-700"
                >
                    Number of PDU in the rack<span class="text-red-500"
                        >***</span
                    >
                </label>
                <div class="mt-1">
                    <VeeField
                        id="number_of_pdu_in_rack"
                        v-model="power.number_of_pdu_in_rack"
                        type="text"
                        name="number_of_pdu_in_rack"
                        rules="required"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <ErrorMessage
                    name="number_of_pdu_in_rack"
                    class="text-red-600"
                />
            </div>

            <!-- Input breaker capacity for PDU -->
            <div class="sm:col-span-3">
                <label
                    for="input_breaker_pdu_capacity"
                    class="block text-sm font-medium text-gray-700"
                >
                    Input breaker capacity for PDU<span class="text-red-500"
                        >***</span
                    >
                </label>
                <div class="mt-1">
                    <VeeField
                        id="input_breaker_pdu_capacity"
                        v-model="power.input_breaker_pdu_capacity"
                        type="text"
                        name="input_breaker_pdu_capacity"
                        rules="required"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <ErrorMessage
                    name="input_breaker_pdu_capacity"
                    class="text-red-600"
                />
            </div>

            <!-- Number of output breaker or socket outlet -->
            <div class="sm:col-span-3">
                <label
                    for="number_of_output_breaker"
                    class="block text-sm font-medium text-gray-700"
                >
                    Number of output breaker or socket outlet<span
                        class="text-red-500"
                        >***</span
                    >
                </label>
                <div class="mt-1">
                    <VeeField
                        id="number_of_output_breaker"
                        v-model="power.number_of_output_breaker"
                        type="text"
                        name="number_of_output_breaker"
                        rules="required"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <ErrorMessage
                    name="number_of_output_breaker"
                    class="text-red-600"
                />
            </div>
            <!-- picture -->
            <div class="sm:col-span-3">
                <label
                    for="layout"
                    class="block text-sm font-medium text-gray-700"
                >
                    Layout or Picture of PDU<span class="text-red-500"
                        >***</span
                    >
                </label>
                <div class="mt-1">
                    <input
                        id="layout"
                        name="layout"
                        type="file"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <!-- <ErrorMessage name="layout" class="text-red-600" /> -->
            </div>
        </VeeForm>
    </div>
</template>

<script>
import { ref } from "vue";
import { PlusIcon, MinusIcon } from "@heroicons/vue/outline";

export default {
    components: {
        PlusIcon,
        MinusIcon,
    },
    setup() {
        const total = ref(0);

        const objOptions = ref([
            {
                description: "",
                quantity: "",
                power: "",
                total: "",
            },
        ]);

        const power = ref({
            pdu_type: "",
            number_of_pdu_in_rack: "",
            input_breaker_pdu_capacity: "",
            number_of_output_breaker: "",
            layout_url: "",
        });

        function addPowerOptions() {
            return objOptions.value.push({
                description: "",
                quantity: "",
                power: "",
                total: "",
            });
        }
        function removePowerOptions(index) {
            return objOptions.value.splice(index, 1);
        }
        function totalPower(inputIndx, qty, power) {
            // return Object.keys(objOptions).forEach((key, index) => {
            //     if (inputIndx == 4) {
            //         objOptions.value["total"] =
            //             objOptions[key].value["quantity"] *
            //             objOptions.value["power"];
            //     }
            // });
        }
        return {
            total,
            objOptions,
            power,
            addPowerOptions,
            removePowerOptions,
            totalPower,
            schema: {
                pdu_type: "required",
                number_of_pdu_in_rack: "required",
                input_breaker_pdu_capacity: "required",
                number_of_output_breaker: "required",
            },
        };
    },
};
</script>

<style lang="scss" scoped></style>
