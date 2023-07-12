Import Note: This is an Implmented from an Mui Autocomplete with formik.

If you don't want to use formik just change the selected value from formik value to an internal state and pass error and touched from the parent component. Then it will work as expected without formik.

This Autocomplete has:
 1. Custom CheckBox
 2. Avatar with uniform color for each indiviual charater
 3. Filtered options will appear on top and can dynamically handle more than 2 lackhs of data you can change the max throughput of the filter limit from the filter props. 
 4. The selected values will appear on Top with a divider that's dividing selected values and unselected values.
 5. Can Include buttons inside autocomplete with button props.
 6. Acceps both array and arrays of objects for filtering.
 7. Auto scrolling on search.
 8. Customize the popper accoring to your requirements.
 9. Responsive on all platforms
 10. Can send label to directly use as a combo
