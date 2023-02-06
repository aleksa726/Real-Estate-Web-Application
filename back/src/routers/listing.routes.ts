import express from 'express';
import { ListingController } from '../controllers/listing.controller';
const listingRoutes = express.Router();

listingRoutes.route('/addListing').post(
    (req, res) => new ListingController().addListing(req, res)
)

listingRoutes.route('/getAllListings').get(
    (req, res) => new ListingController().getAllListings(req, res)
)

listingRoutes.route('/getAllListingsFromMicrolocation').post(
    (req, res) => new ListingController().getAllListingsFromMicrolocation(req, res)
)

listingRoutes.route('/filterListings').post(
    (req, res) => new ListingController().filterListings(req, res)
)

listingRoutes.route('/getUserListings').post(
    (req, res) => new ListingController().getUserListings(req, res)
)

listingRoutes.route('/sell').post(
    (req, res) => new ListingController().sell(req, res)
)

listingRoutes.route('/getListing').post(
    (req, res) => new ListingController().getListing(req, res)
)

listingRoutes.route('/updateListing').post(
    (req, res) => new ListingController().updateListing(req, res)
)

listingRoutes.route('/uploadListingImage').post(
    (req, res) => new ListingController().uploadListingImage(req, res)
)

listingRoutes.route('/filterListingsAdvanced').post(
    (req, res) => new ListingController().filterListingsAdvanced(req, res)
)


listingRoutes.route('/getAllListingsLimited').post(
    (req, res) => new ListingController().getAllListingsLimited(req, res)
)




export default listingRoutes;