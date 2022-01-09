


const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { title, description, address, creator } = req.body;
  
    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }
  
    // const title = req.body.title;
    const createdPlace = new Place({
      title,
      description,
      address,
      location: coordinates,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
      creator
    });
  
    try {
      await createdPlace.save();
    } catch (err) {
      const error = new HttpError(
        'Creating place failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({ place: createdPlace });
  };
  