import * as yup from "yup";

const Form_Validation = yup.object().shape({
  group_id: yup.string().required("Group id is required"),
  group_name: yup
    .string()
    .max(25, "Group name must be less than 25 characters")
    .required("Group Name is required"),
  group_description: Yup.string()
    .min(10, "Group description must be less than 10 characters.")
    .max(100, "Group description must be less than 100 characters.")
    .required("Group Description is required."),
  group_img: yup.mixed().nullable().notRequired(),

  cards: yup.array().of(
    yup.object.shape({
      card_id: yup.string().required("Card id is required"),
      card_name: yup
        .string()
        .max(20, "Term must be less than 20 characters")
        .required("Card id is required"),
      card_description: yup.string()
        .min(25, "Card Description must be greater than 20 characters.")
        .max(500, "Card Description must be less than 500 characters.")
        .required("Card_Description id is required."),
    })
  ),
});
