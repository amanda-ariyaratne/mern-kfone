/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import mongoose from 'mongoose';

// Define the schema for the promotions collection

const promotionSchema = new mongoose.Schema({
  discount: {
    min: 0,
    required: true,
    type: Number,
  },
  endDate: {
    required: true,
    type: Date,
  },
  items: {
    ref: 'Item',
    type: [mongoose.Schema.Types.ObjectId],
  },
  promoCode: {
    required: true,
    type: String,
  },
  startDate: {
    required: true,
    type: Date,
  },
});

// Create a Mongoose model for the promotions collection, based on the itemSchema
const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;
